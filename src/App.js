import React, { useState, useEffect } from "react";

function App() {
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );
  const [bookmarksCopy, setBookmarksCopy] = useState([]);
  const [filter, setFilter] = useState("");
  const submit = e => {
    e.preventDefault();
    // Create a bookmark object
    const bookmark = {
      name: siteName,
      url: siteUrl
    };
    // Check if the local storage is not empty
    if (localStorage.getItem("bookmarks") !== null) {
      // Get bookmarks from local storage
      setBookmarks(JSON.parse(localStorage.getItem("bookmarks")));
    }
    // Adding new bookmark
    setBookmarks([...bookmarks, bookmark]);
    // Empty inputs
    setSiteName("");
    setSiteUrl("");
  };
  useEffect(() => {
    // Update bookmarks in local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarksCopy(bookmarks);
  }, [bookmarks]);
  useEffect(() => {
    setBookmarksCopy(
      bookmarks.filter(bookmark => {
        return bookmark.name.toUpperCase().includes(filter.toUpperCase());
      })
    );
  }, [filter, bookmarks]);
  const removeBookmark = bookmark => {
    const newBookmarks = [...bookmarks];
    for (let i = 0; i < newBookmarks.length; i++) {
      if (newBookmarks[i].name === bookmark.name) {
        newBookmarks.splice(i, 1);
        break;
      }
    }
    setBookmarks(newBookmarks);
  };
  return (
    <div className="container">
      <h3 className="text-muted">Bookmarker</h3>
      <div className="jumbotron">
        <h2>Bookmark Your Favorite Sites</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="siteName">Site Name</label>
            <input
              type="text"
              name="siteName"
              className="form-control"
              placeholder="Enter Site Name..."
              value={siteName}
              onChange={e => {
                setSiteName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="siteUrl">Site Url</label>
            <input
              type="text"
              name="siteUrl"
              className="form-control"
              placeholder="Enter Site Url..."
              value={siteUrl}
              onChange={e => setSiteUrl(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
      <input
        type="text"
        name="filter"
        className="form-control"
        placeholder="Search Bookmarks By Name..."
        value={filter}
        onChange={e => {
          setFilter(e.target.value);
        }}
      />
      <div>
        {bookmarksCopy.map((bookmark, i) => (
          <div key={i}>
            <h3>{bookmark.name}</h3>
            <a href={bookmark.url} className="btn btn-success">
              Visit
            </a>
            <button
              onClick={removeBookmark.bind(this, bookmark)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <footer className="fixed-bottom text-center pb-2">
        &copy; 2019 Bookmarker
      </footer>
    </div>
  );
}

export default App;
