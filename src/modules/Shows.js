class Shows {
    static apiEndPoint = 'https://api.tvmaze.com/shows/1/episodes';

    static getShows = async () => {
      const response = await fetch(this.apiEndPoint).then((response) => response.json());
      return response;
    };

    static updateUI = async () => {
      const shows = await Shows.getShows();
      const card = document.getElementById('card');
      card.classList.add('wrap', 'flex');

      const tvShows = document.querySelector('#tv-shows p');
      tvShows.innerHTML = `${'TV Shows ('}${shows.length})`;
      shows.forEach((show, index) => {
        card.innerHTML += `
                  <div class="container flex-column">
                      <div class="card-image"><img src="${show.image.medium}"></div>
                      <div class="title-like">
                          <div class="show-title"><p>${show.name}</p></div>
                          <div class="likes">
                              <div id='heart${show.id}' class="icon ptr"></div>
                              <div class="likes-count"><p>5 likes</p></div>
                          </div>
                      </div>
                      <div class="card-comments">
                          <button type="button" class="ptr" id="comment-${index}">Comments</button>
                      </div>
                  </div>
              `;
      });
    };
}
module.exports = Shows;