import Parse from "parse/node"

Parse.Cloud.define("issue-service-charge", async (request) => {
    const query = new Parse.Query("Review");
    query.equalTo("movie", request.params.movie);
  });
  