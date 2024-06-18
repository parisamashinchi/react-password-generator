const Checkbox = ({title ,status, onChange}) =>{
    return(
        <div className="checkbox" >
          <input
            type="checkbox"
            checked={status}
            onChange={onChange}
          />
          <label>{title}</label>
        </div>  
    )
}
export default Checkbox;