'use client'

import { Button, ButtonGroup } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { increment, clear, toggleDisable } from "@/store/clickSlice";

export default function ButtonGroupPanel() {
  const count = useSelector((state: RootState) => state.click.count);
  const disabled = useSelector((state: RootState) => state.click.disabled);
  const dispatch = useDispatch();

  return (
    <ButtonGroup variant="outlined" color="primary" orientation="vertical"
    sx={{ width: 100 }} className="pb-12">
      <Button
        onClick={() => dispatch(increment())}
        disabled={disabled}
        sx={{ width: 100 }}
      >
        CLICK: {count}
      </Button>
      <Button onClick={() => dispatch(clear())} sx={{ width: 100 }}>
        CLEAR
      </Button>
      <Button onClick={() => dispatch(toggleDisable())} sx={{ width: 100 }}>
        {disabled ? "ABLE" : "DISABLE"}
      </Button>
    </ButtonGroup>
  );
}
