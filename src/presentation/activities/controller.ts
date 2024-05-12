import { Request, Response } from "express";
import {
  ActivityRepository,
  EditActivity,
  EditActivityDto,
  RegisterActivity,
  RegisterActivityDto,
  CustomError,
} from "../../domain";
import { ActivityModel } from "../../data/mongodb";


export class ActivitiesController {
  // DI
  constructor(private readonly activityRepository: ActivityRepository) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log("error:", error); // Winston
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerActivity = (req: Request, res: Response) => {

    const [error, registerActivityDto] = RegisterActivityDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new RegisterActivity(this.activityRepository)
      .execute(registerActivityDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  registerActivities = (req: Request, res: Response) => {
    if (!Array.isArray(req.body.activities)) {
      return res.status(400).json({ error: "Activities field should be an array" });
    }

    const activitiesPromises = req.body.activities.map((activityData: any) => {

      const [error, registerActivityDto] = RegisterActivityDto.create(activityData);
      if (error) return Promise.reject({ error });

      return new RegisterActivity(this.activityRepository)
        .execute(registerActivityDto!)
        .catch((error) => this.handleError(error, res));
    });

    Promise.all(activitiesPromises)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error }));
  };

  editActivity = (req: Request, res: Response) => {
    const [error, editActivityDto] = EditActivityDto.create(req.body);
    const { id } = req.body;

    if (error) return res.status(400).json({ error });
    if (!id) return res.status(400).json({ error: "id is required!" });

    ActivityModel.findOneAndUpdate({ _id: id }, { ...editActivityDto }, { new: true })
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getActivities = (req: Request, res: Response) => {
    const { activitiesIds } = req.body;
    const { owner } = req.query;
    const query = activitiesIds ? { _id: { $in: activitiesIds } } : (owner ? { owner } : {});

    ActivityModel.aggregate([
      { $match: query },
      { $addFields: { id: { $toString: "$_id" } } },
      { $project: { _id: 0 } }
    ])
      .then((activities) => {
        res.json({ total: activities.length, activities });
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };

  getActivity = (req: Request, res: Response) => {
    const { id } = req.params;

    ActivityModel.findById(id)
      .then((activity) => {
        if (activity) {
          const { _id, ...otherProperties } = activity.toObject();
          res.json({ id: _id.toString(), ...otherProperties });
        } else {
          res.status(404).json({ error: "Activity not found" });
        }
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
