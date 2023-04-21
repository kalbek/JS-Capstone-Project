class Shows {
    static apiEndPoint = "https://api.tvmaze.com/shows/1/episodes";
  
    static getShows = async () => {
      const response = await fetch(this.apiEndPoint).then((response) =>
        response.json()
      );
      return response;
    };
  
    static getLikes = async () => {
      const action = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(
        "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/tV364kOhzeIf5RoUn6sV/likes",
        action
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    };
  
    static updateUI = async () => {
      const shows = await Shows.getShows();
      const card = document.getElementById("card");
      card.classList.add("wrap", "flex");
      const likes = await Shows.getLikes();
      const commentBody = document.getElementById("comment-section");
  
      const tvShows = document.querySelector("#tv-shows p");
      tvShows.innerHTML = `${"TV Shows ("}${shows.length})`;
      shows.forEach((show, index) => {
        card.innerHTML += `
                      <div class="container flex-column">
                          <div class="card-image"><img src="${show.image.medium}"></div>
                          <div class="title-like">
                              <div class="show-title"><p>${show.name}</p></div>
                              <div class="likes">
                                  <div id='heart${show.id}' class="icon ptr"></div>
                                  <div class="likes-count"><p>${
                                      likes.filter((like) => like.item_id - 1 === index)[0]
                                        .likes
                                    } likes</p></div>
                              </div>
                          </div>
                          <div class="card-comments">
                              <button type="button" class="ptr" id="comment-${index}">Comments</button>
                          </div>
                      </div>
                  `;
      });
  
      // dynamically create comments for each listed shows on home page
      shows.forEach((show, index) => {
        // select the comment button
        const commentButton = document.getElementById(`comment-${index}`);
        // when the each comment button is clicked display the popup
        commentButton.addEventListener("click", () => {
          commentBody.innerHTML = "";
          commentBody.innerHTML = `
                            <div class="comments visible" id="comments">
                                <div class="container">
                                    <div class="image-close flex">
                                        <img src="${show.image.original}" alt="" />
                                        <div class="close ptr" id='close'></div>
                                    </div>
                                    <div class='show-details'>
                                      <div class="show-name"><p>${show.name}</p></div>
                                      <div class="descriptions flex-spaced">
                                       <div class="season-rating flex-column">
                                          <div>Season: ${show.season}</div>
                                          <div>Rating: ${show.rating.average}</div>
                                          </div>
                                       <div class="season-rating flex-column">
                                          <div>Air Date: ${show.airdate}</div>
                                          <div>Airtime: ${show.airtime}</div>
                                       </div>
                                      </div>
                                      <div class="comment-header flex-centered ">
                                        Comments
                                      </div>
                                      <div class="add-comment flex-column-centered">
                                          <div class=" comment-lists flex-column" id="comment-lists">
                                             <!-- comments goes here ... -->
                                          </div>
                                          <div class="commnet-controls">
                                            <div class="comment-header add-comment flex-centered ">Add a comment </div>
                                            <button type="button" id="submit-comment" class="ptr">Comment</button>
                                            <div class="name-input"><input type="text"/></div>
                                            <div><textarea rows="8" cols="28"/></textarea></div>
                                          </div>
                                      </div>
                                    </div>
                            </div>
                        </div>
                    `;
          // handle close comments popup
          document.body.style.overflow = "hidden";
          const close = document.getElementById("close");
          close.addEventListener("click", () => {
            // remove the comments from parent div
            commentBody.innerHTML = "";
            document.body.style.overflow = "visible";
          });
        });
      });
    };
  }
  module.exports = Shows;