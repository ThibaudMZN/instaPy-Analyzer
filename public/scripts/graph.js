const COLORS = ['#1DB952', '#1E7E9E', '#FD9528', '#FD4928'];
const RGB_COLORS = ['rgba(29, 185, 82, 0.1)', 'rgba(30, 126, 158, 0.1)', 'rgba(253, 149, 40, 0.1)', 'rgba(253, 73, 40, 0.1)']

$(document).ready(function() {
  $.getJSON('/followers', (json) => {
    let data_followers = parseFollowFile(json);
    $.getJSON('/following', (json) => {
      let data_followings = parseFollowFile(json);
      generateGraphFollow(data_followers, data_followings);
    });
  });


  let json = $.getJSON('/activity', (json) => {
    let data = parseRecordActivity(json);

    let dates = [];
    let comments = [];
    let likes = [];
    let follows = [];
    let server_calls = [];
    let unfollows = [];

    for (d of data) {
      dates.push(d.date);
      comments.push(d.comments);
      likes.push(d.likes);
      follows.push(d.follows);
      server_calls.push(d.server_calls);
      unfollows.push(d.unfollows);
    }

    generateGraphActivity(dates, comments, likes, follows, server_calls, unfollows);
  })


});

function generateGraphActivity(dates, comments, likes, follows, server_calls, unfollows) {
  let ctx = document.getElementById("activityChart").getContext('2d');
  let config = {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
          label: 'Comments',
          backgroundColor: RGB_COLORS[0],
          borderColor: COLORS[0],
          data: comments,
          fill: true,
        },
        {
          label: 'Likes',
          backgroundColor: RGB_COLORS[1],
          borderColor: COLORS[1],
          data: likes,
          fill: true,
        },
        {
          label: 'Follows',
          backgroundColor: RGB_COLORS[2],
          borderColor: COLORS[2],
          data: follows,
          fill: true,
        },
        {
          label: 'Unfollows',
          backgroundColor: RGB_COLORS[3],
          borderColor: COLORS[3],
          data: unfollows,
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Activity Supervisor'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Day'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Values'
          }
        }]
      }
    }
  };
  let myChart = new Chart(ctx, config);
}

function generateGraphFollow(followers, followings) {
  let ctx = document.getElementById("followChart").getContext('2d');
  let config = {
    type: 'line',
    data: {
      labels: followers.dates,
      datasets: [{
          label: 'Followers',
          backgroundColor: RGB_COLORS[0],
          borderColor: COLORS[0],
          data: followers.vals,
          fill: true,
        },
        {
          label: 'Following',
          backgroundColor: RGB_COLORS[2],
          borderColor: COLORS[2],
          data: followings.vals,
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Followers Supervisor'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Day'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Followers'
          }
        }]
      }
    }
  };
  let myChart = new Chart(ctx, config);
}