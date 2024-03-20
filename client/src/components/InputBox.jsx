function InputBox(props) {
  return (
    <input
      type={props.type}
      className={
        'outline-none rounded-full m-2 p-1 pl-4 text-slate-700 text-base focus:placeholder:text-slate-700 focus:cursor-none ' +
        props.className
      }
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      autoComplete="off"
      onKeyDown={props.onKeyDown}
    />
  );
}

export default InputBox;
