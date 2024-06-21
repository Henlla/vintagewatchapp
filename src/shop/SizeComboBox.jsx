import { FormControl, MenuItem, Select } from "@mui/material";

const SizeComboBox = (props) => {
    const item = props.item
    return (
        <FormControl className="select-product" fullWidth size="small">
            <Select
                labelId="size-label"
                id="size"
                name="size"
                value={item.size}
                onChange={() => handleChange(item, event)}
            >
                <MenuItem value={36}>36mm</MenuItem>
                <MenuItem value={38}>38mm</MenuItem>
                <MenuItem value={42}>42mm</MenuItem>
                <MenuItem value={44}>44mm</MenuItem>
                <MenuItem value={46}>46mm</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SizeComboBox;