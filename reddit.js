async function fetchReddit() {
    try {
        const response = await fetch("https://www.reddit.com/r/SGExams/top.json?limit=5");
        const data = await response.json();
        
        let postsHTML = "";
        data.data.children.forEach(post => {
            postsHTML += `
                <div class="post">
                    <h3><a href="https://www.reddit.com${post.data.permalink}" target="_blank">${post.data.title}</a></h3>
                    <p>👍 ${post.data.ups} | 💬 ${post.data.num_comments}</p>
                </div>
            `;
        });

        document.getElementById("reddit-feed").innerHTML = postsHTML;
    } catch (error) {
        console.error("Error fetching Reddit posts:", error);
        document.getElementById("reddit-feed").innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    }
}

// Call the function when the page loads
fetchReddit();
