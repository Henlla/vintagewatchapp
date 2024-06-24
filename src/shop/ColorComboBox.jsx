import { FormControl, MenuItem, Select } from "@mui/material";

const ColorComboBox = (props) => {
    const item = props.item
    // console.log(item)
    return (
        <FormControl className="select-product" fullWidth size="small">
            <Select
                labelId="color-label"
                id="color"
                name="color"
                value={item.color}
                onChange={props.handleChange}
            >
                <MenuItem value={"Yellow"}>Yellow</MenuItem>
                <MenuItem value={"Red"}>Red</MenuItem>
                <MenuItem value={"White"}>White</MenuItem>
                <MenuItem value={"Black"}>Black</MenuItem>
                <MenuItem value={"Pink"}>Pink</MenuItem>
            </Select>
        </FormControl>
    );
}

export default ColorComboBox;