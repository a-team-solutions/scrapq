import test from "tape";
import { readFileSync } from "fs";
import { scrap, $ } from "../../lib";

const shtml = readFileSync("./test/exhaustive/agescx.html").toString();

test("agescx documentation", (main) => {

	test("should get all navigation items from agescx", (t) => {
		const result = scrap(shtml, {
			navs: $.list("ul.navbar-nav>li:not(.disabled)", {
				text: $.text("li > a"),
				link: $.attr("li > a", "href"),
				submenu: $.list("ul.dropdown-menu>li", {
					text: $.text("li > a"),
					link: $.attr("li > a", "href")
				})
			}),
			title: $.text("h1"),
			content: $.html('div[role="main"]')
		});

		t.equal(result.navs.length, 9);
		t.equal(result.navs[2].submenu.length, 2);
		t.equal(result.navs[2].submenu[0].text, "Adding new unit");
		t.equal(result.content.length, 1114);
		t.equal(result.title, "Agescx Documentation");
		t.end();
	});

	main.end();
});
