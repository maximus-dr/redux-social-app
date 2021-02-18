import React from 'react'
import { parseISO } from 'date-fns';
import { formatDistanceToNow } from 'date-fns/esm';

export default function TimeAgo({ timestamp }) {

  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
