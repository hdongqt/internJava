import React, { useState, useRef,useEffect} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BookAPI } from 'api/BookAPI'
import { CategoryAPI } from 'api/CategoryAPI';
import {required} from 'utils/handelValidate';

export default function AddBook() {
  const {bookId} = useParams();
  const [author, setAuthor] = useState('')
  const [listCategorySelect, setListCategorySelect] = useState([])
  const [bookname, setBookName] = useState('')
  const [inventory, setInventory] = useState(0)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [categoryCode, setCategoryCode] = useState('')
  const [file, setFile] = useState(null)
  const history =  useHistory()
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  const handelAddBook = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        let book = {author, bookname, inventory,price,total,categoryCode}
        if(bookId){
            book = {id: bookId , ...book}
            BookAPI.updateBook(book).then((response) => {
                history.push('/book')
            }).catch(error => {
                console.log(error)
            })
    
        }else{
            BookAPI.createBook(book).then((response) =>{
               if(response.data){
                    alert("Thêm sách thành công !");
                    history.push('/book');
               }
            }).catch(error => {
                if(error.response.data){
                    const objectt = error.response.data
                    let mess = "";
                    for (let key in objectt) {
                        if (objectt.hasOwnProperty(key)) {
                          mess += `\n ${objectt[key]}`
                        }
                      }
                    alert(mess)
                }
            })
        }
   
      }
}
useEffect(() => {

    const getInfoBook = async () =>{
          const response = await BookAPI.getBookById(bookId);
          if(response.data){
               const result = response.data;
               setAuthor(result.author)
               setBookName(result.bookname)
               setCategoryCode(result.categoryCode)
               setInventory(result.inventory)
               setPrice(result.price)
               setTotal(result.total)
              }
    }
    if(bookId){
        getInfoBook();
    }
}, [bookId])

useEffect(() => {

    const getListCategory = () =>{
     CategoryAPI.getAllCategorys().then(response=>{
      if(response.data){
        console.log(response.data)
        setListCategorySelect(response.data)
      }
     }).catch(error=>{
      console.log(error)
     })
    }
    getListCategory()
    console.log(listCategorySelect)
}, [])

  return (
    <div>
  

 </div>
  )
}
