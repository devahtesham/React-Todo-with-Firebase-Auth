import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {
  db,
  db_collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";

function TodoApp() {
  const [todo, setTodo] = useState();
  const [todoList, setTodoList] = useState([]);
  const [indexNum, setIndexNum] = useState();
  const [updatedTodoVal, setUpdatedTodoVal] = useState();
  // this state for current logged user details
  const [userDetails, setUserDetails] = useState("");
  // const userId = localStorage.getItem("uid");
  const navigate = useNavigate();
  // // console.log("index number is" + indexNum);
  // useEffect(() => {
  //   if (!userId) {
  //     navigate("/login");
  //   }
  // }, []); //  this method is not sufficient so instead of this we use private routing and private the route /todo

  // this effect is for getting data from todocollection
  useEffect(() => {
    const getData = async () => {
      const fbResponse = await getDocs(db_collection);
      let arr = [];
      fbResponse.forEach((doc) => {
        // console.log(doc.data().todoValue);
        arr.push({
          value: doc.data().todoValue,
          id: doc.id,
        });
      });
      // console.log(arr);
      setTodoList([...arr]);
    };
    getData();
  }, [todo]);
  // this effect is for getting user data which is currently logged in from user collection
  useEffect(() => {
    const getUserData = async () => {
      const userId = localStorage.getItem("uid"); // user agr is path pr ayya hy tu must hy k wo login hua hyy tu laazmi iski uid local storage men pari hui hogi
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setUserDetails(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getUserData();
  });

  // Add todo in a list
  const addTodo = (e) => {
    setTodo(e.target.value);
  };
  // display todo
  const displayTodo = async () => {
    if (!todo) {
      alert("Please Enter a Valid Todo");
      return;
    }
    // firebase involving
    const myObj = {
      todoValue: todo,
    };
    await addDoc(db_collection, myObj);
    todoList.push(todo);
    setTodoList([...todoList]);
    setTodo("");
  };
  // delete all
  const deleteAll = () => {
    setTodoList([]);
  };
  // delete todo
  const deleteHandler = (i) => {
    const deleteData = async () => {
      const docId = todoList[i].id;
      const docRef = doc(db, "todoCollection", docId);
      await deleteDoc(docRef);
    };
    deleteData();
    // =====>>>>> using array splice method
    todoList.splice(i, 1);
    setTodoList([...todoList]);

    // =====>>>>> using array filter method
    // let ans = todoList.filter((val, val_index) => {
    //   return val[val_index] !== val[i];
    // });
    // console.log(ans);
    // setTodoList([...ans]);
  };

  // ================  EDIT TODO THROUGH PROMPT ==================
  // const editHandler = (i) => {
  //   todoList[i] = prompt("Enter updated value", todoList[i]);
  //   setTodoList([...todoList]);
  // };

  // ================= 2nd method ============
  // const editHandler = (i) => {
  //   setEditTodo(true);
  // };
  const updateTodoHandler = (i) => {
    if (!updatedTodoVal) {
      return;
    }
    const docId = todoList[i].id;
    const updateData = async () => {
      const valueRef = doc(db, "todoCollection", docId);
      await updateDoc(valueRef, {
        todoValue: updatedTodoVal,
      });
    };
    updateData();

    todoList.splice(i, 1, { value: updatedTodoVal, id: docId });
    // OR
    // todoList[i]=updatedTodoVal
    setTodoList([...todoList]);
    setIndexNum("");
    setUpdatedTodoVal("");
  };
  const editTodo = (i) => {
    setUpdatedTodoVal(todoList[i].value);
  };
  const logoutHandler = () => {
    navigate("/login");
    localStorage.removeItem("uid");
  };
  const { name, email } = userDetails;

  return (
    <div className="container">
      <div className="user__details mt-4 ">
        <h1 className="text-center fst-italic fw-bolder">Welcome {name} !</h1>
        <h5 className="text-center fw-bold fst-italic">{email}</h5>
      </div>
      <div className="text-end mb-4">
        <button className="btn btn-warning py-2 px-3" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <h1 className="text-center mb-1">TODO APPLICATION</h1>
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <section
            className="d-flex justi
          fy-content-between align-items-center mt-4"
          >
            <input
              className="form-control w-75"
              type="text"
              placeholder="Enter your Todo"
              onChange={addTodo}
              value={todo}
            />{" "}
            <br />
            <button className="btn btn-primary mx-3" onClick={displayTodo}>
              Add New Todo
            </button>
            <button className="btn btn-danger" onClick={deleteAll}>
              Delete All
            </button>
          </section>
        </div>
        <div className="col-lg-8 mt-5">
          <section>
            {todoList.map((v, i) => (
              <>
                {indexNum === i ? (
                  <div>
                    <input
                      className="form-control"
                      onChange={(e) => {
                        setUpdatedTodoVal(e.target.value);
                      }}
                      autoFocus
                      value={updatedTodoVal}
                    />
                    <button
                      className="btn btn-warning mt-3"
                      onClick={() => {
                        updateTodoHandler(i);
                      }}
                    >
                      UPDATE
                    </button>
                  </div>
                ) : (
                  <div
                    class="alert alert-danger d-flex justify-content-between align-items-center pb-3 mb-4 item text-dark"
                    key={i}
                  >
                    {v.value}
                    <div className="d-flex align-items-center gap-2">
                      <span>
                        <MdDelete
                          size={25}
                          color={"black"}
                          onClick={() => {
                            deleteHandler(i);
                          }}
                        />
                      </span>
                      <span>
                        <BiEdit
                          size={25}
                          color={"black"}
                          onClick={() => {
                            setIndexNum(i);
                            editTodo(i);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
