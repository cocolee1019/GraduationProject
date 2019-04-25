package graduationProject.hngxy.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class TaskPlan {
    private Integer id;

    private Integer taskId;

    private Integer receiveId;

    private String receiveName;

    private Integer releaseId;

    private String releaseName;

    private String taskPlanDetail;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endDate;

    private String planState;

    private String mome;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public Integer getReceiveId() {
        return receiveId;
    }

    public void setReceiveId(Integer receiveId) {
        this.receiveId = receiveId;
    }

    public String getReceiveName() {
        return receiveName;
    }

    public void setReceiveName(String receiveName) {
        this.receiveName = receiveName == null ? null : receiveName.trim();
    }

    public Integer getReleaseId() {
        return releaseId;
    }

    public void setReleaseId(Integer releaseId) {
        this.releaseId = releaseId;
    }

    public String getReleaseName() {
        return releaseName;
    }

    public void setReleaseName(String releaseName) {
        this.releaseName = releaseName == null ? null : releaseName.trim();
    }

    public String getTaskPlanDetail() {
        return taskPlanDetail;
    }

    public void setTaskPlanDetail(String taskPlanDetail) {
        this.taskPlanDetail = taskPlanDetail == null ? null : taskPlanDetail.trim();
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getPlanState() {
        return planState;
    }

    public void setPlanState(String planState) {
        this.planState = planState == null ? null : planState.trim();
    }

    public String getMome() {
        return mome;
    }

    public void setMome(String mome) {
        this.mome = mome == null ? null : mome.trim();
    }
}