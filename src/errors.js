export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  //잘못된 사용자 정보로 인해 목록을 가져올 수 없음
  export class ReviewListFetchError extends Error {
    errorCode = "R001";
    statusCode = 400;
    
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

//요청한 가게에 대해 미션이 존재하지 않거나 잘못된 가게 ID
export class MissionNotFoundError extends Error {
  errorCode = "M001";
  statusCode = 404;
  
  constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
  }
}

//진행 중인 미션 목록조회할 때 사용자 정보 불일치, 미션 데이터가 없는 경우
export class ActiveMissionListFetchError extends Error {
  errorCode = "M002";
  statusCode = 400;
  
  constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
  }
}

//미션 상태를 업데이트 하지 못하거나, 해당 미션이 이미 완료인 경우
export class MissionStatusUpdateError extends Error {
  errorCode = "M003";
  statusCode = 400;
  
  constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
  }
}