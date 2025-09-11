import asyncWrapper from "../utils/asyncWrapper.util.js";
import sendResponse from "../utils/sendResponse.util.js";
import AppError from "../utils/AppError.util.js";
import { Station } from "../models/station.model.js";
import { Comment } from "../models/comment.model.js";

const addComment = asyncWrapper(async (req, res) => {
  const { comment, station_id } = req.body;
  if ([comment, station_id].some((field) => field.trim() === "")) {
    throw new AppError(`${field} required!`, 400);
  }

  const station = await Station.exists({ _id: station_id });
  if (!station) {
    throw new AppError("Station not found!", 400);
  }

  const cmnt = new Comment({
    text: comment,
    user: req._id,
    station: station_id,
  });
  await cmnt.save();

  const data = {
    comment: cmnt.text,
    station_id: cmnt.station,
    createdAt: cmnt.createdAt,
  };

  sendResponse(res, 200, "Comment added sucessfully!", data);
});

const deleteComment = asyncWrapper(async (req, res) => {
  const comment_id = req.body?.comment_id;
  if (!comment_id || comment_id.trim() === "") {
    throw new AppError("Comment id required!", 400);
  }

  const comment = await Comment.findByIdAndDelete(comment_id);
  if (!comment) {
    throw new AppError("Comment does not exists!", 400);
  }

  sendResponse(res, 200, "Comment deleted");
});

export { addComment, deleteComment };
