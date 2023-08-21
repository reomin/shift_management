import React, { useState } from 'react';
import { RowData } from '../../types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Portal,
  Box
} from '@chakra-ui/react'; // お使いのUIライブラリに合わせてインポートを調整

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// データの型定義
interface TableProps {
  data: RowData[];
}

//indexページからpropsを渡す
const Table: React.FC<TableProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<{ title: string; date: string }[]>([]);

  const eventData = data.map((row) => ({
    title: row.title,
    date: row.date,
  }));

  const handleDateSelect = (selectionInfo: any) => {
    const selectedDate = selectionInfo.startStr;
    setSelectedDate(selectedDate);

    const eventsForSelectedDate = eventData.filter((event) => event.date === selectedDate);
    setSelectedEvents(eventsForSelectedDate);
  };

  return (
    <Box>
      <div className='m-8'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={eventData}
          select={handleDateSelect}
          selectable={true}
          selectMirror={true}
        />
      </div>
      <div className="mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {selectedDate && (
          <Popover isOpen={selectedDate !== null} onClose={() => setSelectedDate(null)}>
            <PopoverTrigger>
              <h1></h1>
            </PopoverTrigger>
            <Portal>
            <PopoverContent width='1000px' height='500px' p='4'> {/* 最大幅とパディングを調整 */}
                <PopoverArrow />
                <PopoverHeader>{`選択された日付 (${selectedDate}) のイベント`}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  {selectedEvents.map((event, index) => (
                    <div key={index}>{event.title}</div>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
      </div>
    </Box>
  );
};

export default Table;
