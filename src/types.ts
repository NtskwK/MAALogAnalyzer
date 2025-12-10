// 日志条目类型
export interface LogEntry {
  timestamp: string
  sink_type: string
  message: string
  details: Record<string, any>
  _file?: string
  _line?: number
}

// 任务信息
export interface TaskInfo {
  task_id: number
  entry: string
  start_time: string
  end_time?: string
  status: 'running' | 'succeeded' | 'failed'
  entries: LogEntry[]
  duration?: number
}

// Next 列表项
export interface NextListItem {
  name: string
  anchor: boolean
  jump_back: boolean
}

// 节点信息
export interface NodeInfo {
  name: string
  timestamp: string
  status: 'running' | 'success' | 'failed'
  node_id?: number
  actions: ActionInfo[]
  next_list: NextListItem[]
  entries: LogEntry[]  // 原始日志条目
  jump_back?: boolean  // 是否为跳转返回节点
  anchor?: boolean     // 是否为锚点节点
  recognitionDetails?: RecognitionDetail[]
  actionDetails?: ActionDetail[]
}

// 操作信息
export interface ActionInfo {
  type: 'recognition' | 'action' | 'nextlist'
  name: string
  status: 'success' | 'failed'
  reco_id?: number
  action_id?: number
  details?: Record<string, any>
}

// 识别详情
export interface RecognitionDetail {
  box?: [number, number, number, number]
  score?: number
  [key: string]: any
}

// 动作详情
export interface ActionDetail {
  [key: string]: any
}

// 合并后的操作信息（识别 + 动作）
export interface OperationInfo {
  index: number
  name: string
  status: 'success' | 'warning' | 'error'
  recognition?: ActionInfo | null
  action?: ActionInfo | null
  recognitionDetail?: RecognitionDetail
  actionDetail?: ActionDetail
}

// 统计信息
export interface Statistics {
  totalEntries: number
  sinkTypes: Record<string, number>
  messageTypes: Record<string, number>
  tasks: number
  failures: number
  timeRange: {
    start: string
    end: string
  }
}

// 性能数据
export interface PerformanceData {
  operation: string
  duration: number
  count: number
  avgDuration: number
}



