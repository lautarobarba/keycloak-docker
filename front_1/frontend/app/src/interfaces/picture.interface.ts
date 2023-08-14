export interface Picture {
	id: number,
	fileName: string,
	path: string,
	mimetype: string,
	originalName: string,
	createdAt: Date,
	updatedAt: Date,
	deleted: boolean,
	fileDeleted: boolean,
}