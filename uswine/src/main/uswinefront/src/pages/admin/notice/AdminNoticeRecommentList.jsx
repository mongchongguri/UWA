export default function ReCommentComponent({ commentIdx,recommentList,handleRecommentCheck,DateFormat }) {
        
    return (
      <div className="notice_recomment_container">
            {recommentList[commentIdx].map((recomment,index)=>(
                <div key={index} className="admin_comment_info">
                    <input
                        type="checkbox"
                        id={`${recomment.nickname}_${recomment.id}`}
                        name="checkbox_notice"
                        className="checkbox_notice"
                        onChange={(e)=>handleRecommentCheck(e.target.id,e)}   
                    />
                    <div className="admin_comment_info_nickname">
                        {recomment.nickname}
                    </div>
                    <div className="admin_comment_info_comment">{recomment.recomment}</div>
                    <div className="admin_comment_info_writedate">
                        {DateFormat(recomment.writedate)}
                    </div>
                    <div className="admin_comment_info_comment_recomment">
                        답글
                    </div>

                </div>
            ))}
        
      </div>
    );
  }