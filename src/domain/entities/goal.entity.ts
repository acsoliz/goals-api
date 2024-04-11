export class GoalEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public type: string,
    public difficulty: number,
    // public createdAt: string,
    // public updatedAt: string,
    public status: string
  ) {}
}
