const Poll = require("../../models/post.model");
const { ApiResponse } = require("../../utils/ApiResonse");
exports.createPoll = async (req, res) => {
  try {
    const { id } = req.user;
    const { content, poll_question, poll_options } = req.body;

    const newPoll = await new Poll({
      content,
      author: id,
      post_type: "poll",
      poll_question,
      poll_options,
    });

    const savedPoll = await newPoll.save();
    return ApiResponse(res, savedPoll, "Poll created successfully", 201, true);
  } catch (err) {
    return ApiResponse(res, null, err.message, 500, false);
    
  }
};
exports.vote = async (req, res) => {
  try {
    const { id } = req.params;
    const { option: selectedOptionText } = req.body;

    // Find the poll by its ID
    const poll = await Poll.findById(id);

    if (!poll) {
      // If the poll is not found, send a 404 Not Found response
      return ApiResponse(res, null, "Poll not found", 404, false);
    }

    let userHasVotedForAnyOption = false;

    // Iterate over poll options to check if the user has voted for any option
    for (const option of poll.poll_options.values()) {
      if (option.votedBy.includes(req.user.id)) {
        userHasVotedForAnyOption = true;
        break; // Exit the loop if the user has voted for any option
      }
    }

    if (userHasVotedForAnyOption) {
      // If the user has already voted for any option in this poll, send a 400 Bad Request response
      return ApiResponse(
        res,
        null,
        "You have already voted in this poll",
        400,
        false
      );
    }

    // Check if the selected option exists in the poll's options Map
    const selectedOption = poll.poll_options.get(selectedOptionText);

    if (!selectedOption) {
      // If the selected option does not exist, send a 400 Bad Request response
      return ApiResponse(res, null, "Invalid option selected", 400, false);
    }

    // Check if the user has already voted for this poll option
    const userHasVotedForOption = selectedOption.votedBy.includes(req.user.id);

    if (userHasVotedForOption) {
      // If the user has already voted for this option, send a 400 Bad Request response
      return ApiResponse(
        res,
        null,
        "You have already voted for this option",
        400,
        false
      );
    }

    // Increment the vote count for the selected option
    selectedOption.votes += 1;

    // Add the user's ID to the votedBy array for the selected option
    selectedOption.votedBy.push(req.user.id);

    // Save the updated poll
    await poll.save();

    // Send a 200 OK response with the updated poll data
    return ApiResponse(res, poll, "Vote added successfully", 200, true);
  } catch (error) {
    // Handle any errors that occur during the voting process
    return ApiResponse(res, null, error.message, 500, false);
  }
};
