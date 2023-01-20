import React from 'react'

const ProfilePage = () => {
  return (
    <>
       <div className="fb-profile-header">
      <div className="fb-header-shad"></div>
      <div className="fb-cover-photo">
        <img
          src="https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-1323206.jpg&fm=jpg"
          alt=""
        />
        <button><span className="camera-icon"></span> Edit cover photo</button>
      </div>
      <div className="fb-profile-details">
        <div className="profile-info">
          <div className="profile-photo">
            <img src="./assets/images/user.png" alt="" />
          </div>
          <div className="profile-desc">
            <h1>Asraful Haque <span>( neooo inc )</span></h1>
            <div className="profile-follow-details">
              <span className="profile-followers">15k follower</span>
              <span className="profile-following">1k following</span>
            </div>
            <div className="profile-friends-list">
              <ul>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-action">
          <button><span className="follow-icon"></span> <span>Follow</span></button>
          <button>
            <span className="message-icon"></span> <span>Message</span>
          </button>
          <button>
            <span className="add-friend-icon"></span> <span>Add friend</span>
          </button>
        </div>
      </div>
      <div className="fb-profile-menu">
        <ul>
          <li><a href="#">Posts</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Followers</a></li>
          <li><a href="#">Photos</a></li>
          <li><a href="#">Videos</a></li>
          <li><a href="#">Articlse</a></li>
          <li><a href="#">More</a></li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default ProfilePage