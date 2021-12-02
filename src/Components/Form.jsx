import { useState,useRef} from "react"
import style from "./Form.module.css";

export default function Form({onTaskCreate}) {

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        address: "",
        department: "",
        salary: "",
        maritalStatus: false,
        image: null
    })

    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;

        const val = type === "checkbox" ? checked : value

        setFormData({
            ...formData,
            [name]: val
        });
    }

    const imageRef = useRef(null)
    const handleImageChange = (e) => {
        const file = imageRef.current.files[0];
        let src = null;
        if (file) {
            src = URL.createObjectURL(file);
        }
        setFormData({
            ...formData,
            image: src
          });
        return () => {
            URL.revokeObjectURL(src);
        };
    }

    const handleSubmit=(e)=>{
         e.preventDefault();
        onTaskCreate &&  onTaskCreate(formData);
        setFormData("");
    }

    return (
        <div className={style.form}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>NAME : </label>
                    <input type="text"
                        placeholder="Enter Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>AGE : </label>
                    <input type="number"
                        placeholder="Enter Your Age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>ADDRESS : </label>
                    <input type="text"
                        placeholder="Enter Your Addresss"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>DEPARTMENT: </label>
                    <select name="department"
                        value={formData.department}
                        onChange={handleChange}
                    >
                        <option value="" key="1">
                            Select a Department
                        </option>
                        <option value="CEO" key="CEO">CEO</option>
                        <option value="Director" key="D">Director</option>
                        <option value="Manager" key="M">Manager</option>
                        <option value="Front-End Developer" key="FDV">Front-End Developer</option>
                        <option value="Back-End Developer" key="BDV">Back-End Developer</option>
                        <option value="Software Developer" key="SD">Software Developer</option>
                    </select>
                </div>
                <div>
                    <label>SALARY : </label>
                    <input type="number"
                        placeholder="Enter Your Salary in ₹"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Marital status: </label>
                    <input
                        checked={formData.maritalStatus}
                        onChange={handleChange}
                        name="maritalStatus"
                        type="checkbox"
                    />
                </div>
                <div>
                    <label>Profile Picture: </label>
                    <input
                        multiple
                        onChange={handleImageChange}
                        ref={imageRef}
                        type="file"
                    />
                    {/* {imageSrc && <img src={imageSrc} alt="profile" />} */}
                </div>
                <div>
                    <input type="submit" value="SUBMIT" />
                </div>
            </form>
        </div>
    )
}