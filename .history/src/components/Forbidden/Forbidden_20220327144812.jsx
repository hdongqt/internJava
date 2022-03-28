import React from 'react'
import { Link } from 'react-router-dom';

export default function Forbidden () {
  return (
    <div class="container py-5">
    <div class="row">
         <div class="col-md-12 text-center">
              <p><i class="fa fa-exclamation-triangle fa-5x"></i><br/>Status Code: 403</p>
              <h3>OPPSSS!!!! Sorry...</h3>
              <p>Sorry, your access is refused due to security reasons of our server and also our sensitive data.<br/>Please go back to the previous page to continue browsing.</p>
              <Link class="btn btn-danger" to="/">Go Back</Link>
       </div>
    </div>
</div>
  )
}
