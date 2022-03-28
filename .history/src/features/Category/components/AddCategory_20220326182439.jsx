import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CategoryAPI } from 'api/CategoryAPI';

export default function AddCategory() {
  const {categoryId} = useParams();
  const [categoryName, setCategoryName] = useState('')
  const [code, setCode] = useState('')
  const history =  useHistory()

 
}
