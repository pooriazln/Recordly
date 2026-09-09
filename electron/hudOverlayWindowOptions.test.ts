import { describe, expect, it } from "vitest";
import { getHudOverlayTaskbarOptions } from "./hudOverlayWindowOptions";

describe("getHudOverlayTaskbarOptions", () => {
	it("keeps a focusable HUD in the Windows taskbar", () => {
		expect(getHudOverlayTaskbarOptions("win32")).toEqual({
			skipTaskbar: false,
			focusable: true,
		});
	});

	it("keeps the HUD non-focusable on macOS while staying out of the taskbar", () => {
		expect(getHudOverlayTaskbarOptions("darwin")).toEqual({
			skipTaskbar: true,
			focusable: false,
		});
	});

	it("keeps the Linux HUD focusable for native window dragging", () => {
		expect(getHudOverlayTaskbarOptions("linux")).toEqual({
			skipTaskbar: true,
			focusable: true,
		});
	});
});
