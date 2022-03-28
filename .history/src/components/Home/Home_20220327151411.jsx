import React from 'react'

export default function Home() {
  return (
    <div className='container'>
   <div className="row">
     <div className="col-8">
     <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark mt-5">
          <h4 className="display-4 font-italic">Robertson Davies</h4>
          <p className="lead my-3">Một cuốn sách thực sự hay nên đọc trong tuổi trẻ, rồi đọc lại khi đã trưởng thành, và một nửa lúc tuổi già, giống như một tòa nhà đẹp nên được chiêm ngưỡng trong ánh bình minh, nắng trưa và ánh trăng</p>
      </div>
     </div>
   </div>
      <div className="row mb-2 mt-5">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 shadow-sm h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">
                <a className="text-dark" href="#">Featured post</a>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img src="https://cafeandbooks.files.wordpress.com/2015/07/dscn4570.jpg" alt="anh"
            className="card-img-right flex-auto d-none d-lg-block"
            style={{width: "200px",height: "250px",objectFit: "cover"}}
            />
            {/* <img className="card-img-right flex-auto d-none d-lg-block" 
            data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" 
            style="width: 200px; height: 250px;"
             src="" data-holder-rendered="true"></img> */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 shadow-sm h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">
                <a className="text-dark" href="#">Featured post</a>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img src="https://cafeandbooks.files.wordpress.com/2015/07/dscn4570.jpg" alt="anh"
            className="card-img-right flex-auto d-none d-lg-block"
            style={{width: "200px",height: "250px",objectFit: "cover"}}
            />
            {/* <img className="card-img-right flex-auto d-none d-lg-block" 
            data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" 
            style="width: 200px; height: 250px;"
             src="" data-holder-rendered="true"></img> */}
          </div>
        </div>
          <div className="col-md-6">
          <div className="card flex-md-row mb-4 shadow-sm h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">
                <a className="text-dark" href="#">Featured post</a>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img src="https://cafeandbooks.files.wordpress.com/2015/07/dscn4570.jpg" alt="anh"
            className="card-img-right flex-auto d-none d-lg-block"
            style={{width: "200px",height: "250px",objectFit: "cover"}}
            />
            {/* <img className="card-img-right flex-auto d-none d-lg-block" 
            data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" 
            style="width: 200px; height: 250px;"
             src="" data-holder-rendered="true"></img> */}
          </div>
        </div>
      </div>
    </div>
  )
}
