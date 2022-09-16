async function commentFormHandler(event) {
    event.preventDefault();
  
    //capture form data
    const comment_text = document.querySelector('textarea[name="comment-body"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  console.log(id)
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      //reloads page if comment added successfully
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
  