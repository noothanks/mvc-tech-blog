async function upvoteClickHandler(event) {
    event.preventDefault();
  
    //gets id from url
    //grabs url
    //splits into array by /
    //return last item in arr to get id value
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/posts/upvote', {
      method: 'PUT',
      body: JSON.stringify({
        //get post id from above
        //user id is required but saved in session
        //user id accessed in back end
        post_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#upvote-btn').addEventListener('click', upvoteClickHandler);
