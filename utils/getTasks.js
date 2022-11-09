const fs = require("fs");
const { parse } = require("csv-parse");
const { files } = require("./writeCsv");

function sortAlphabets(tasks, field, order) {
  const sortedTasks = [];

  let strings = tasks.map((task) => {
    return {
      id: task.id,
      value: task[field],
    };
  });

  strings = strings.sort((a, b) => {
    return order === "asc"
      ? a.value?.localeCompare(b.value)
      : b.value?.localeCompare(a.value);
  });

  strings.forEach((string) => {
    const taskMatch = tasks.find((task) => task.id === string.id);
    sortedTasks.push(taskMatch);
  });

  return sortedTasks;
}

module.exports = async function getTasks(filters = { responsible }, orderBy, terminadas) {
  let tasks = [];

  const stream = fs
    .createReadStream(`./documentos/${files[0]}.csv`)
    .pipe(parse({ delimiter: ",", from_line: 2 }));

  for await (const chunk of stream) {
    const task = {
      id: chunk[0],
      description: chunk[1],
      type: chunk[2],
      responsible: chunk[3],
      createdAt: chunk[4],
      finishBy: chunk[5],
    };
    if(terminadas){
      if(task.finishBy){
        Object.keys(filters).forEach((filter) => {
          if (task[filter] === filters[filter]) {
            tasks.push(task);
          } else if (!filters[filter]) {
            switch (filter) {
              case "responsible":
                tasks.push(task);
                break;
            }
          }
        });
      }
    }else{
      if(!task.finishBy){
        Object.keys(filters).forEach((filter) => {
          if (task[filter] === filters[filter]) {
            tasks.push(task);
          } else if (!filters[filter]) {
            switch (filter) {
              case "responsible":
                tasks.push(task);
                break;
            }
          }
        });
      }
    }
  }

  if (orderBy) {
    const [key, order] = orderBy.split(",");
    tasks = sortAlphabets(tasks, key, order);
    return tasks;
  } else {
    return tasks;
  }
};
