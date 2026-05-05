import os
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:8010")


def same_image_url(left: str, right: str) -> bool:
    left_parts = urlparse(left)
    right_parts = urlparse(right)
    return (left_parts.netloc, left_parts.path) == (right_parts.netloc, right_parts.path)


def assert_loaded_image(locator, label: str) -> str:
    locator.wait_for(state="visible", timeout=15_000)
    locator.page.wait_for_function(
        "image => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0",
        arg=locator.element_handle(),
        timeout=15_000,
    )
    image = locator.evaluate(
        """image => ({
            src: image.currentSrc || image.src,
            width: image.naturalWidth,
            height: image.naturalHeight
        })"""
    )
    if image["width"] <= 0 or image["height"] <= 0:
        raise AssertionError(f"{label} did not load: {image['src']}")
    return image["src"]


def main() -> None:
    image_responses = {}

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 1200})

        def track_response(response):
            if response.request.resource_type == "image":
                image_responses[response.url] = response.status

        page.on("response", track_response)
        page.goto(BASE_URL, wait_until="networkidle", timeout=60_000)

        broken = []
        checked = []

        country_buttons = page.locator(".country-button")
        country_count = country_buttons.count()
        if country_count != 12:
            raise AssertionError(f"Expected 12 country buttons, found {country_count}")

        for index in range(country_count):
            button = country_buttons.nth(index)
            country = button.inner_text()
            button.click()
            src = assert_loaded_image(page.locator("#dossier-photo"), f"Portrait for {country}")
            checked.append(("portrait", country, src))

        page.locator("#year-slider").fill("1979")
        page.wait_for_function("document.querySelectorAll('.book-card').length === 22")

        covers = page.locator(".book-cover")
        cover_count = covers.count()
        if cover_count != 22:
            raise AssertionError(f"Expected 22 book covers, found {cover_count}")

        for index in range(cover_count):
            card = page.locator(".book-card").nth(index)
            title = card.locator(".book-title").inner_text()
            src = assert_loaded_image(covers.nth(index), f"Cover for {title}")
            checked.append(("cover", title, src))

        expected_urls = {src for _, _, src in checked}
        for url in expected_urls:
            matching_statuses = [
                status for response_url, status in image_responses.items()
                if same_image_url(response_url, url)
            ]
            if matching_statuses and not any(200 <= status < 400 for status in matching_statuses):
                broken.append(f"{matching_statuses[-1]} {url}")

        browser.close()

    if broken:
        raise AssertionError("Broken image responses:\n" + "\n".join(broken))

    print(f"Checked {len([item for item in checked if item[0] == 'portrait'])} portraits")
    print(f"Checked {len([item for item in checked if item[0] == 'cover'])} book covers")


if __name__ == "__main__":
    main()
