import { linkTo } from "../Router.js";


const BASE_URL = 'http://localhost:33088';


export const getTodoList = async () =>{
  const response = await axios.get(`${ BASE_URL }/api/todolist`);
  return response;
}


export const onSubmitTodoRegister = async (event, titleInput, contentInput) => {
  event.preventDefault();

  if (titleInput.value === '' || contentInput.value === '') {
      alert("할일을 입력하세요^^");
      return;
  }

  const body = {
    title: titleInput.value,
    content: contentInput.value,
    done: false
  }

  try {

    if (confirm('등록 하시겠습니까?')) {
      const response = 
      await axios.post(`${ BASE_URL }/api/todolist`, body);

      if (response) {
        linkTo('/');
      }
    }
  }
  catch (error) {
    console.log(error);
  }
}


export const onChangeCheckbox = async (event, checkbox, todo) => {

  const isChecked = checkbox.checked;

  try {
    const response = 
    await axios
    .patch(`${ BASE_URL }/api/todolist/${ todo._id }`, 
    { done: isChecked });

    if (response) {
      const NEXT_SIBLING = event.target.nextSibling;

      todo.done = isChecked;

      if (isChecked) {
        todo.done = false;
        NEXT_SIBLING.classList.add('line-through');
      } 
      else {
        todo.done = true;
        NEXT_SIBLING.classList.remove('line-through');
      }
    }
  } 
  catch (error) {
    console.error('API 업데이트에 실패했습니다:', error);
  }
}


export const onClickDeleteTodo =  async (todoId, li) => {
  try {
    if (confirm('정말 삭제 하시겠습니까?')) {
      const response = 
      await axios
      .delete(`${BASE_URL}/api/todolist/${ todoId }`);

      if (response) {
        li.remove();
      }
    }
  } 
  catch (error) {
    console.error('API 삭제에 실패했습니다:', error);
  }
}


export const getTodoData = async (todoId) => {
  try {
    const response = 
    await axios(`${ BASE_URL }/api/todolist/${ todoId }`);

    const data = response.data.item;

    return data;
  } 
  catch (error) {
    console.log(error);
  }
};


export const onClickDeleteInInfo = async (todoId) => {
  try {
    const response = 
    await axios.delete(`${ BASE_URL }/api/todolist/${ todoId }`);
    
    if (confirm('삭제 하시겠습니까?')) {
      if (response) {
        linkTo('/')
      }
    }
  } 
  catch (error) {
    console.error(error);
  }
}


export const onClickEditTodo = async (
  event, 
  titleInput, 
  contentInput, 
  todoId, 
  backButton
  ) => 

{

  event.preventDefault();

  if (titleInput.value === '' || contentInput.value === '') {
      alert("할일을 입력하세요^^");
      return;
  }

  let newTitleValue = '';
  let newContentValue = '';


  newTitleValue = titleInput.value;
  newContentValue = contentInput.value;

  const body = { 
      title: newTitleValue, 
      content: newContentValue 
  }

  try {

    if (confirm('수정 하시겠습니까?')) {
      const response = 
      await axios.patch(`${ BASE_URL }/api/todolist/${ todoId }`, body);

      if (response) {
        linkTo(backButton.getAttribute('href'));
      }
    }
  }
  catch (error) {
    console.log(error);
  }
}