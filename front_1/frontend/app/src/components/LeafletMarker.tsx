import React from "react";
import { Popup } from "react-leaflet";

type MarkerPopupProps = {
    name: string;
}

export const MarkerPopup = (props: MarkerPopupProps) => {
    const { name } = props;
    return (
        <Popup>
            <div>{name}</div>
        </Popup>
    );
};
