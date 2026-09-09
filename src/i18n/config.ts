export const I18N_NAMESPACES = [
	"common",
	"launch",
	"editor",
	"timeline",
	"settings",
	"dialogs",
	"shortcuts",
] as const;

export type I18nNamespace = (typeof I18N_NAMESPACES)[number];
