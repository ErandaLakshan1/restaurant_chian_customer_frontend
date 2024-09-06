import React, { useState } from "react";
import "../assets/styles/components/reservations.css";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { popAlert } from "../utils/alerts";

const Reservation = ({ isOpen, onRequestClose, tables, onReserve }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleReservation = () => {
    if (selectedTable && selectedDate) {
      onReserve(selectedTable, selectedDate);
      onRequestClose();
    } else {
      popAlert("Oops...", "Please select a table and date", "error");
    }
  };

  const handleTableSelection = (tableId) => {
    setSelectedTable((prev) => (prev === tableId ? null : tableId));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="reservation-modal"
      overlayClassName="reservation-modal-overlay"
      ariaHideApp={false}
    >
      <button className="close-btn" onClick={onRequestClose}>
        &times;
      </button>
      <h2>Make a Table Reservation</h2>
      <div className="reservation-date-picker">
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
          className="date-picker"
        />
      </div>
      <div className="reservation-tables">
        <table>
          <thead>
            <tr>
              <th>Table Number</th>
              <th>Seating Capacity</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.id}>
                <td>{table.table_number}</td>
                <td>{table.seating_capacity}</td>
                <td>{table.description}</td>
                <td>
                  <button
                    onClick={() => handleTableSelection(table.id)}
                    className={`reserve-btn ${
                      selectedTable === table.id ? "selected" : ""
                    }`}
                  >
                    {selectedTable === table.id ? "Selected" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleReservation}
        className="reserve-btn confirm-reservation-btn"
      >
        Confirm Reservation
      </button>
    </Modal>
  );
};

export default Reservation;
