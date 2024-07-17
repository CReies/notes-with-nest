import { Injectable } from '@nestjs/common';
import { INote } from '../interfaces/INote';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NotesService {
	private notes: INote[] = [];

	getNotes(): INote[] {
		return this.notes;
	}

	getNoteById(id: string): INote {
		return this.notes.find((note) => note.id === id);
	}

	createNote(note: INote): INote {
		const newNote = {
			...note,
			id: uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.notes.push(newNote);
		return newNote;
	}

	updateNoteById(id: string, note: INote): INote {
		const index = this.notes.findIndex((note) => note.id === id);
		const prevNote = this.notes[index];

		this.notes[index] = {
			...note,
			updatedAt: new Date(),
		};

		return this.notes[index];
	}

	deleteNoteById(id: string): INote {
		const index = this.notes.findIndex((note) => note.id === id);
		const note = this.notes[index];
		this.notes.splice(index, 1);

		return note;
	}
}
