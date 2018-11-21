function parseDate(date) {
  let d = date.split('-');
  let parsed = d[2] + '/' + d[1];
  return parsed;
}

function parseRecordActivity(json) {
  let usr = 'esquisse_beats';
  let data = [];
  for (let date in json[usr]) {
    let comments = 0;
    let likes = 0;
    let follows = 0;
    let server_calls = 0;
    let unfollows = 0;
    let content = json[usr][date];

    for (let v in content) {
      comments += parseInt(content[v].comments);
      likes += parseInt(content[v].likes);
      follows += parseInt(content[v].follows);
      server_calls += parseInt(content[v].server_calls);
      unfollows += parseInt(content[v].unfollows);
    }

    let entry = {
      date: parseDate(date),
      comments: comments,
      likes: likes,
      follows: follows,
      server_calls: server_calls,
      unfollows: unfollows
    }

    data.push(entry);
  }
  data.sort((a, b) => (a.date > b.date) ? 1 : (b.date > a.date) ? -1 : 0);
  return data;
}


function parseFollowFile(json) {
  json.data.sort((a, b) => (a.date > b.date) ? 1 : (b.date > a.date) ? -1 : 0);
  let dates = [];
  let vals = [];
  for (let v of json.data) {
    let date = v.date.split('-')[2] + '/' + v.date.split('-')[1];
    let val = parseInt(v.val);
    let idx = dates.indexOf(date);
    if (idx !== -1) {
      dates[idx] = date;
      vals[idx] = val;
    } else {
      dates.push(date);
      vals.push(val);
    }
  }
  let data = {
    dates: dates,
    vals: vals
  }
  return data;
}