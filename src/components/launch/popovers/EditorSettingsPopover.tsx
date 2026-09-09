import type { ReactElement } from "react";
import { useCallback, useState } from "react";
import { useScopedT } from "@/contexts/I18nContext";
import { SettingsPanel } from "@/components/video-editor/SettingsPanel";
import {
	loadEditorPreferences,
	saveEditorPreferences,
	type EditorPreferences,
} from "@/components/video-editor/editorPreferences";
import styles from "../LaunchWindow.module.css";
import { useLaunchPopoverCoordinator } from "./LaunchPopoverCoordinator";
import { HudPopover } from "./PopoverScaffold";

const POPOVER_ID = "editor-settings";

/**
 * The HUD has no project yet, so this panel edits the same saved defaults that
 * the editor reads when a fresh recording opens. Keeping it on the HUD lets a
 * person set their motion and cursor preferences before pressing Record.
 */
export function EditorSettingsPopover({ trigger }: { trigger: ReactElement }) {
	const t = useScopedT("launch");
	const [preferences, setPreferences] = useState(() => loadEditorPreferences());
	const { isOpen, requestClose, requestOpen } = useLaunchPopoverCoordinator();
	const open = isOpen(POPOVER_ID);

	const updatePreferences = useCallback((patch: Partial<EditorPreferences>) => {
		setPreferences((current) => ({ ...current, ...patch }));
		saveEditorPreferences(patch);
	}, []);

	return (
		<HudPopover
			open={open}
			onOpenChange={(nextOpen) => {
				if (!nextOpen) {
					requestClose(POPOVER_ID);
					return;
				}
				requestOpen(POPOVER_ID);
			}}
			trigger={trigger}
			align="end"
		>
			<div className={styles.ddLabel}>{t("recording.settings", "Settings")}</div>
			<p className="px-3 pb-2 text-[10px] leading-4 text-[var(--launch-text-muted)]">
				{t(
					"recording.settingsDefaults",
					"These defaults apply when your next recording opens in the editor.",
				)}
			</p>
			<div className="max-h-[520px] w-[340px] overflow-y-auto px-3 pb-3">
				<SettingsPanel
					activeEffectSection="settings"
					selected={preferences.wallpaper}
					onWallpaperChange={(wallpaper) => updatePreferences({ wallpaper })}
					aspectRatio={preferences.aspectRatio}
					onAspectRatioChange={(aspectRatio) => updatePreferences({ aspectRatio })}
					autoApplyFreshRecordingAutoZooms={
						preferences.autoApplyFreshRecordingAutoZooms
					}
					onAutoApplyFreshRecordingAutoZoomsChange={(autoApplyFreshRecordingAutoZooms) =>
						updatePreferences({ autoApplyFreshRecordingAutoZooms })
					}
					connectZooms={preferences.connectZooms}
					onConnectZoomsChange={(connectZooms) => updatePreferences({ connectZooms })}
					zoomInDurationMs={preferences.zoomInDurationMs}
					onZoomInDurationMsChange={(zoomInDurationMs) =>
						updatePreferences({ zoomInDurationMs })
					}
					zoomOutDurationMs={preferences.zoomOutDurationMs}
					onZoomOutDurationMsChange={(zoomOutDurationMs) =>
						updatePreferences({ zoomOutDurationMs })
					}
					cursorSize={preferences.cursorSize}
					onCursorSizeChange={(cursorSize) => updatePreferences({ cursorSize })}
					cursorSmoothing={preferences.cursorSmoothing}
					onCursorSmoothingChange={(cursorSmoothing) =>
						updatePreferences({ cursorSmoothing })
					}
					cursorSpringStiffnessMultiplier={
						preferences.cursorSpringStiffnessMultiplier
					}
					onCursorSpringStiffnessMultiplierChange={(
						cursorSpringStiffnessMultiplier,
					) => updatePreferences({ cursorSpringStiffnessMultiplier })}
					cursorSpringDampingMultiplier={preferences.cursorSpringDampingMultiplier}
					onCursorSpringDampingMultiplierChange={(cursorSpringDampingMultiplier) =>
						updatePreferences({ cursorSpringDampingMultiplier })
					}
					cursorSpringMassMultiplier={preferences.cursorSpringMassMultiplier}
					onCursorSpringMassMultiplierChange={(cursorSpringMassMultiplier) =>
						updatePreferences({ cursorSpringMassMultiplier })
					}
					cursorClickBounce={preferences.cursorClickBounce}
					onCursorClickBounceChange={(cursorClickBounce) =>
						updatePreferences({ cursorClickBounce })
					}
					cursorClickBounceDuration={preferences.cursorClickBounceDuration}
					onCursorClickBounceDurationChange={(cursorClickBounceDuration) =>
						updatePreferences({ cursorClickBounceDuration })
					}
				/>
			</div>
		</HudPopover>
	);
}
