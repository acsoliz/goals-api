export class GoalEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public type: string,
    public difficulty: number,
    public owner: string,
    public dates: {
      createdAt: Date;
      updatedAt: Date;
      completionDate?: Date;
    },
    public status: string
  ) {}
}
