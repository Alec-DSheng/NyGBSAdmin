const scan = {
  1: {
    span: 24,
    height: 100,
    name: '一屏',
    video: [
      {
        id: 'span_1_1'
      }
    ]
  },
  4: {
    span: 12,
    height: 50,
    name: '四屏',
    video: [
      {
        id: 'span_4_1'
      },
      {
        id: 'span_4_2'
      },
      {
        id: 'span_4_3'
      },
      {
        id: 'span_4_4'
      }
    ]
  },
  9: {
    span: 8,
    height: 33.33,
    name: '九屏',
    video: [
      {
        id: 'span_9_1'
      },
      {
        id: 'span_9_2'
      },
      {
        id: 'span_9_3'
      },
      {
        id: 'span_9_4'
      },
      {
        id: 'span_9_5'
      },
      {
        id: 'span_9_6'
      },
      {
        id: 'span_9_7'
      },
      {
        id: 'span_9_8'
      },
      {
        id: 'span_9_9'
      }
    ]
  }
}
export function getScanData (scanNum) {
  let sc = scan[scanNum]
  return sc
}
export function cleanScan(scanNum) {
  let sc = scan[scanNum]
  if (sc != null) {
    sc.video.forEach(element => {
      element.url = null
    });
  }
}