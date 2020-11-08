export interface ShowModel {
	readonly id: number;
	readonly genres: Array<string>;
	readonly name: string;
	readonly image: { medium: string; original: string };
	readonly summary: string | null;
}
