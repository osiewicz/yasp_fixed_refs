export interface Note {
  title: string;
  content: string;
  tags: string[];
  whenCreated: string;
  whenEdited: string;
}

export const createNote = ({
  title = "Note title",
  content = "Note content",
  tags = ["Tag1", "Tag2"],
  whenCreated = new Date("2020-01-01").toISOString(),
  whenEdited = new Date("2020-03-03").toISOString()
}: Partial<Note> = {}): Note => {
  return {
    title,
    content,
    tags,
    whenCreated,
    whenEdited
  };
};
