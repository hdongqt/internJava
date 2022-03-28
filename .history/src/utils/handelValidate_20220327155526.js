import { isEmail } from "validator";
const required = (value) => {
    if (!value && value!=0) {
      return (
        <div className="alert alert-danger" role="alert">
         Trường bắt buộc nhập dữ liệu !
        </div>
      );
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Email không hợp lệ.
        </div>
      );
    }
  };
  
  const lt = (value, props,components) => {
    // get the maxLength from component's props
    if (value !== components['newPassword'][0].value) {
      // Return jsx
      return <span className="error text-danger">Mật khẩu không trùng khớp</span>
    }
  };
  

  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
         Username có độ dài từ 3 đến 20 kí tự.
        </div>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          Mật khẩu có độ dài từ 6 đến 40 kí tự.
        </div>
      );
    }
  };
  const vaddress = (value) => {
      if (value.length < 3 || value.length > 150) {
        return (
          <div className="alert alert-danger" role="alert">
           Địa chỉ có độ dài từ 3 đến 150 kí tự.
          </div>
        );
      }
    };


    const vnumber = (value) => {
      if (+value < 1) {
        return (
          <div className="alert alert-danger" role="alert">
            Số không được nhỏ hơn 1
          </div>
        );
      }
    };

export {required,validEmail,vusername,vpassword,vaddress,lt,vnumber};