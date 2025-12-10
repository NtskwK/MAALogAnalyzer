<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { PerformanceData } from '../types'

const props = defineProps<{
  data: PerformanceData[]
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)

// 使用简单的 Canvas 绘制，不需要额外依赖
const drawChart = () => {
  if (!chartRef.value) return
  
  const canvas = chartRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布大小
  canvas.width = canvas.offsetWidth
  canvas.height = 400

  const width = canvas.width
  const height = canvas.height
  const padding = { top: 20, right: 20, bottom: 60, left: 80 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // 清空画布
  ctx.fillStyle = '#18181c'
  ctx.fillRect(0, 0, width, height)

  if (props.data.length === 0) return

  // 获取前10个数据
  const displayData = props.data.slice(0, 10)
  const maxDuration = Math.max(...displayData.map(d => d.avgDuration))

  // 绘制柱状图
  const barWidth = chartWidth / displayData.length * 0.8
  const gap = chartWidth / displayData.length * 0.2

  displayData.forEach((item, index) => {
    const x = padding.left + index * (barWidth + gap)
    const barHeight = (item.avgDuration / maxDuration) * chartHeight
    const y = padding.top + chartHeight - barHeight

    // 绘制柱子
    ctx.fillStyle = '#63e2b7'
    ctx.fillRect(x, y, barWidth, barHeight)

    // 绘制数值
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`${item.avgDuration.toFixed(2)}s`, x + barWidth / 2, y - 5)

    // 绘制标签（旋转）
    ctx.save()
    ctx.translate(x + barWidth / 2, padding.top + chartHeight + 10)
    ctx.rotate(Math.PI / 4)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'left'
    const label = item.operation.length > 15 ? 
      item.operation.substring(0, 15) + '...' : item.operation
    ctx.fillText(label, 0, 0)
    ctx.restore()
  })

  // 绘制坐标轴
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding.left, padding.top)
  ctx.lineTo(padding.left, padding.top + chartHeight)
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
  ctx.stroke()

  // Y轴标题
  ctx.save()
  ctx.translate(20, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('平均耗时 (秒)', 0, 0)
  ctx.restore()
}

onMounted(() => {
  drawChart()
})

watch(() => props.data, () => {
  drawChart()
}, { deep: true })
</script>

<template>
  <div style="width: 100%; height: 400px; background: #18181c; border-radius: 4px; padding: 10px">
    <canvas ref="chartRef" style="width: 100%; height: 100%"></canvas>
  </div>
</template>



