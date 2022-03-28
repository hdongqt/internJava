import React from 'react'

export default function Home() {
  return (
    <div className='container'>
  <div class="ombre-externe">
		<div class="ombre-interne">
				<div id="carouselExampleCaptions" class="carousel slide " data-bs-ride="carousel">
					<div class="carousel-inner">
						<div class="carousel-item active">
							<img src="https://nsm09.casimages.com/img/2021/07/21//21072103063525998217500508.jpg" class="d-block w-100 peinture-ombre-interne-fine" alt="...">
							<div class="carousel-caption">
								<h5>
									First slide
								</h5>
								<p>
								</p>
							</div>
						</div>
						<div class="carousel-item">
							<img src="https://nsm09.casimages.com/img/2021/07/21//21072103063625998217500510.jpg" class="d-block w-100" alt="...">
							<div class="carousel-caption">
								<h5>
									Second slide 
								</h5>
								<p>
								</p>
							</div>
						</div>
						<div class="carousel-item">
							<img src="https://nsm09.casimages.com/img/2021/07/21//21072103063625998217500509.jpg" class="d-block w-100" alt="...">
							<div class="carousel-caption">
								<h5>
									Third slide
								</h5>
								<p> 
								</p>
							</div>
						</div>
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
		</div>
		<!-- ombre-interne -->
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
