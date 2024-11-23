<template>
  <div class="about">
    <el-row justify="center">
      <el-col class="about-list" :span="16">
        <h1>About WIC Power</h1>
        <el-card class="company-intro">
          <template #header>
            <div class="card-header">
              <span>Company Introduction</span>
            </div>
          </template>
          <div class="content">
            <p>WIC Power Technology Co., Ltd is a professional manufacturer of power supplies and power solutions. With
              years of
              experience in R&D and manufacturing, we specialize in switching power supply, adapter, LED driver and
              customized
              power solutions.</p>
            <p>Our products are widely used in LED lighting, security monitoring, communication equipment, industrial
              control,
              medical equipment and other fields.</p>
          </div>
        </el-card>

        <el-card class="products-card">
          <template #header>
            <div class="card-header">
              <span>Our Products</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="LED Driver">Indoor & Outdoor LED Drivers, Dimmable LED
              Drivers</el-descriptions-item>
            <el-descriptions-item label="Power Adapter">Desktop Adapters, Wall Mount Adapters</el-descriptions-item>
            <el-descriptions-item label="Industrial Power">DIN Rail Power Supply, Enclosed Power
              Supply</el-descriptions-item>
            <el-descriptions-item label="Custom Solutions">Customized Power Solutions Based on Customer
              Requirements</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card class="contact-card">
          <template #header>
            <div class="card-header">
              <span>Contact Information</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="Address">Building A2, Hongfa Hi-tech Park, Tangtou, Shiyan, Bao'an District,
              Shenzhen,
              China</el-descriptions-item>
            <el-descriptions-item label="Tel">+86-755-29994189</el-descriptions-item>
            <el-descriptions-item label="Email">sales@wic-power.com</el-descriptions-item>
            <el-descriptions-item label="Website">www.wic-power.com</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.about {
  padding: 0px;
  margin: 0 auto;
  overflow-y: auto;

  .about-list {
    max-width: 1200px;
    max-height: 110vh;

    margin: 0 auto;
    padding: 0px;
    overflow-y: scroll;
    margin-bottom: 100px;
    padding-bottom: 200px;

    /* 纵向滚动条 */
    &::-webkit-scrollbar {
      width: 2px;
      /* 仅设置宽度，针对纵向滚动条 */
    }

    /* 滚动条轨道 */
    &::-webkit-scrollbar-track {
      background: #f0f0f08f;
      border-radius: 4px;
    }

    /* 滑块 */
    & ::-webkit-scrollbar-thumb {
      background: #888888a0;
      border-radius: 4px;
    }

    /* 滑块悬停效果 */
    & ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }


    h1 {
      color: #003366;
      text-align: center;
      margin-bottom: 20px;
    }

    .el-card {
      margin-bottom: 20px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;

      span {
        font-size: 16px;
        font-weight: bold;
        color: #003366;
      }
    }

    .content {
      p {
        margin-bottom: 14px;
        line-height: 1.5;
        color: #333;
        font-size: 12px;
      }
    }

    .el-descriptions {
      margin: 10px 0;
    }
  }

  :deep(.el-descriptions__label) {
    background-color: #f5f7fa;
    color: #003366;
    font-weight: bold;
  }

  :deep(.el-descriptions__content) {
    line-height: 1.4;
  }


}
</style>
