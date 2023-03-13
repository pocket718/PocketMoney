export const taskListHeight = () => {
  const id = ['task-container-1', 'task-container-2', 'task-container-3'];
  setTimeout(() => {
    let max = 0;
    id.map(data => {
      // let height = document.getElementById(data)?.offsetHeight || 0;
      let innerheight =
        document.getElementById(`${data}innerDiv`)?.offsetHeight || 0;

      if (innerheight > max) {
        max = innerheight;
      }
    });
    if (max) {
      id.map(data => {
        let element = document.getElementById(data);
        if (element) {
          element.style.height = `${max}px`;
        }
      });
    }
  }, 500);
};
