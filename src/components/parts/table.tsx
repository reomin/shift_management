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


// getでeventテーブルの情報を取得する

const Table: React.FC<TableProps> = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 選択された日付を管理するstate

  const eventData = data.map((row) => ({
    title: row.title,
    date: row.date,
  }));

  const handleDateSelect = (selectionInfo:any) => {
    console.log(selectionInfo);
    const selectedDate = selectionInfo.startStr; // 選択された日付を取得

    setSelectedDate(selectedDate); // 選択された日付をstateに設定
    const selectedEvents = eventData.filter((event) => event.date === selectedDate);

    // ポップオーバーを表示
    setSelectedDate(selectedDate);
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
      {/* ポップオーバー */}
      {selectedDate && (
              <Popover isOpen={selectedDate !== null} onClose={() => setSelectedDate(null)}>
                <PopoverTrigger>
                  {/* ここでトリガーとなる要素を設定 */}
                <Button colorScheme='blue'>選択した日付のイベント</Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>{`選択された日付 (${selectedDate}) のイベント`}</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    {/* イベントの表示 */}
                    {/* selectedEventsの内容を表示 */}
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
